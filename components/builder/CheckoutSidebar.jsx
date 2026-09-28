"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

import {
  getSetupEntries,
  getWeeklyTotal,
  useWorkspaceStore,
} from "@/store/useWorkspaceStore";
import { CATEGORIES, needsDesk } from "@/data/categories";
import { formatPrice, getSourceUrl } from "@/data/furniture";

import ProductImage from "./ProductImage";

const iconButtonClassName =
  "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline bg-canvas text-ink active:bg-surface-strong disabled:cursor-not-allowed disabled:text-border-strong";

const textButtonClassName = "cursor-pointer text-sm text-link active:text-ink";

// Plain-text order to paste into an email or chat with monis.rent.
const buildOrderText = (entries, weeklyTotal, weeks) =>
  [
    "My workspace setup (weekly rental, USD)",
    "",
    ...entries.map(
      ({ label, item }) =>
        `- ${label}: ${item.name} (${formatPrice(item.weeklyPrice)}/week) ${getSourceUrl(item)}`,
    ),
    "",
    `Weekly total: ${formatPrice(weeklyTotal)}`,
    `Rental length: ${weeks} ${weeks === 1 ? "week" : "weeks"}`,
    `Estimated total: ${formatPrice(weeklyTotal * weeks)}`,
  ].join("\n");

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

function LineItem({ entry, onChange, onRemove }) {
  const { item, label } = entry;

  return (
    <li className="flex gap-3 py-3">
      <div className="border-hairline bg-canvas relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border">
        <ProductImage item={item} sizes="56px" iconSize={22} className="p-1" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-muted text-xs font-medium tracking-[0.16px]">
              {label}
            </p>

            <p className="text-ink truncate text-sm leading-[1.4] font-medium">
              {item.name}
            </p>
          </div>

          <p className="text-ink shrink-0 text-right text-sm">
            {formatPrice(item.weeklyPrice)}
            <span className="text-muted block text-xs">/ week</span>
          </p>
        </div>

        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            onClick={onChange}
            aria-label={`Change ${label}`}
            className={textButtonClassName}
          >
            Change
          </button>

          <a
            href={getSourceUrl(item)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${textButtonClassName} inline-flex items-center gap-0.5`}
          >
            monis.rent <ArrowUpRight size={13} aria-hidden="true" />
          </a>

          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={onRemove}
            className="text-muted active:bg-surface-strong ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </li>
  );
}

function Section({ title, entries, openCategory, removeItem }) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-5">
      <h3 className="text-muted text-sm font-medium tracking-[0.16px]">
        {title}
      </h3>

      <ul className="divide-hairline divide-y">
        {entries.map((entry) => (
          <LineItem
            key={entry.slot}
            entry={entry}
            onChange={() => openCategory(entry.slot)}
            onRemove={() => removeItem(entry.slot)}
          />
        ))}
      </ul>
    </section>
  );
}

// Every empty slot as a button: keyboard access to the in-scene "+" markers,
// which are WebGL meshes and can't take focus.
function EmptySlots({ selections, openCategory }) {
  const empty = Object.entries(CATEGORIES).filter(
    ([slot]) => !selections[slot],
  );

  if (empty.length === 0) return null;

  return (
    <details className="group border-hairline mt-5 border-t pt-4">
      <summary className="text-ink flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
        Add more · {plural(empty.length, "empty spot")}
        <ChevronDown
          size={16}
          className="transition-transform group-open:rotate-180"
        />
      </summary>

      <ul className="mt-2">
        {empty.map(([slot, config]) => {
          const deskMissing = needsDesk(slot) && !selections.desk;

          return (
            <li key={slot}>
              <button
                type="button"
                disabled={deskMissing}
                onClick={() => openCategory(slot)}
                className="text-ink active:bg-surface-strong flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {config.label}

                <span className="text-body text-xs">
                  {deskMissing ? "Add a desk first" : "Add"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export default function CheckoutSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const selections = useWorkspaceStore((state) => state.selections);
  const weeks = useWorkspaceStore((state) => state.rentalWeeks);
  const setWeeks = useWorkspaceStore((state) => state.setRentalWeeks);
  const openCategory = useWorkspaceStore((state) => state.openCategory);
  const removeItem = useWorkspaceStore((state) => state.removeItem);

  const [copied, setCopied] = useState({ status: null, text: null });

  const entries = getSetupEntries(selections);
  const weeklyTotal = getWeeklyTotal(entries);
  const orderText = buildOrderText(entries, weeklyTotal, weeks);

  const copyStatus =
    copied.status === "failed" || copied.text === orderText
      ? copied.status
      : null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied({ status: "copied", text: orderText });
    } catch {
      setCopied({ status: "failed", text: null });
    }
  };

  const close = () => setIsOpen(false);

  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      cartButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        ref={cartButtonRef}
        type="button"
        aria-label={`Open checkout, ${plural(entries.length, "item")}`}
        aria-expanded={false}
        onClick={() => setIsOpen(true)}
        className="border-hairline bg-canvas text-ink active:bg-surface-strong absolute top-8 right-8 z-45 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border"
      >
        <ShoppingCart size={24} />

        {entries.length > 0 && (
          <span
            aria-hidden="true"
            className="bg-primary text-on-primary absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium"
          >
            {entries.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <aside
      aria-labelledby="checkout-title"
      className="border-hairline bg-canvas text-ink absolute top-0 right-0 z-45 flex h-full w-full flex-col sm:w-96 sm:border-l"
    >
      {/* HEADER */}
      <div className="border-hairline flex items-start justify-between gap-4 border-b px-6 py-5">
        <div>
          <p className="text-muted text-sm font-medium tracking-[0.16px]">
            Checkout
          </p>

          <h2
            id="checkout-title"
            className="text-ink mt-1 text-2xl leading-[1.35] tracking-[0.12px]"
          >
            Your setup
          </h2>

          <p className="text-body mt-1 text-sm leading-tight">
            {plural(entries.length, "item")} · weekly rental from monis.rent
          </p>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close checkout"
          onClick={close}
          className={iconButtonClassName}
        >
          <X size={18} />
        </button>
      </div>

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto px-6 pb-5">
        {entries.length === 0 && (
          <p className="text-body mt-5 text-sm">
            Your setup is empty. Use the “+” markers in the room, or the list
            below, to add furniture.
          </p>
        )}

        <Section
          title="At the desk"
          entries={entries.filter((entry) => entry.zone === "desk")}
          openCategory={openCategory}
          removeItem={removeItem}
        />

        <Section
          title="Around the room"
          entries={entries.filter((entry) => entry.zone !== "desk")}
          openCategory={openCategory}
          removeItem={removeItem}
        />

        <EmptySlots selections={selections} openCategory={openCategory} />
      </div>

      {/* SUMMARY */}
      <div className="border-hairline bg-surface-soft border-t px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-ink text-sm font-medium" id="rental-length">
            Rental length
          </p>

          <div
            className="flex items-center gap-3"
            role="group"
            aria-labelledby="rental-length"
          >
            <button
              type="button"
              aria-label="One week less"
              disabled={weeks <= 1}
              onClick={() => setWeeks(weeks - 1)}
              className={iconButtonClassName}
            >
              <Minus size={16} />
            </button>

            <p
              className="text-ink w-18 text-center text-base"
              aria-live="polite"
            >
              {plural(weeks, "week")}
            </p>

            <button
              type="button"
              aria-label="One week more"
              disabled={weeks >= 52}
              onClick={() => setWeeks(weeks + 1)}
              className={iconButtonClassName}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <dl className="text-body mt-3 text-sm">
          <div className="flex justify-between">
            <dt>Weekly total</dt>
            <dd className="text-ink">{formatPrice(weeklyTotal)}</dd>
          </div>
        </dl>

        <div className="border-hairline mt-3 flex items-end justify-between border-t pt-3">
          <p className="text-ink text-base font-medium">Estimated total</p>
          <p className="text-ink text-2xl">
            {formatPrice(weeklyTotal * weeks)}
          </p>
        </div>

        <p className="text-muted mt-2 text-xs leading-tight">
          Weekly rates. Monthly plans, deposits and delivery are confirmed by
          monis.rent.
        </p>

        <button
          type="button"
          disabled={entries.length === 0}
          onClick={handleCopy}
          className="bg-primary text-on-primary active:bg-primary-active mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copyStatus === "copied" && <Check size={18} />}
          {copyStatus === "copied" ? "Copied" : "Copy order summary"}
        </button>

        <p className="text-body mt-2 min-h-5 text-sm" aria-live="polite">
          {copyStatus === "copied" &&
            "Paste it into an email or chat with monis.rent to place the order."}
          {copyStatus === "failed" &&
            "Couldn't access the clipboard. Please allow clipboard access and try again."}
        </p>
      </div>
    </aside>
  );
}
