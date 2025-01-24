import { getLastNDaysRange } from "../../../../../../../components/analytics/date-range-selector";
import type { Range } from "../../../../../../../components/analytics/date-range-selector";
import { ignoreTime } from "./date";
import { simulatePageProcessingDelay } from "./delays";

export async function pageProcessing(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const fromStr = searchParams.from;
  const toStr = searchParams.to;
  await simulatePageProcessingDelay();

  const defaultRange = getLastNDaysRange("last-30");
  const range: Range =
    fromStr && toStr && typeof fromStr === "string" && typeof toStr === "string"
      ? {
          from: ignoreTime(new Date(fromStr)),
          to: ignoreTime(new Date(toStr)),
          type: "custom",
        }
      : {
          from: ignoreTime(defaultRange.from),
          to: ignoreTime(defaultRange.to),
          type: defaultRange.type,
        };

  return range;
}
