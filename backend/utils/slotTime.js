const envOffset = Number(process.env.HOSPITAL_UTC_OFFSET_MINUTES);
const OFFSET_MINUTES =
  process.env.HOSPITAL_UTC_OFFSET_MINUTES !== undefined &&
  Number.isFinite(envOffset)
    ? envOffset
    : 330;

// Returns the slot start as UTC milliseconds, or null if the text is not a real date and time.
export function slotToUtcMs(dateStr, timeStr) {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr ?? "").trim());
  const t = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(timeStr ?? "").trim());
  if (!d || !t) return null;

  const year = Number(d[1]);
  const month = Number(d[2]);
  const day = Number(d[3]);
  let hour = Number(t[1]);
  const minute = Number(t[2]);

  if (hour < 1 || hour > 12 || minute > 59) return null;

  // Reject dates like 2026-02-31 that JavaScript would silently roll over
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }

  hour = hour % 12;
  if (t[3].toUpperCase() === "PM") hour += 12;

  return Date.UTC(year, month - 1, day, hour, minute) - OFFSET_MINUTES * 60000;
}

// true = the slot has already started, false = still in the future, null = unreadable date or time
export function isPastSlot(dateStr, timeStr, nowMs = Date.now()) {
  const ms = slotToUtcMs(dateStr, timeStr);
  if (ms === null) return null;
  return ms <= nowMs;
}
