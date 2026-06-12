import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import { allergenColumns, allergenPage, allergenSections } from "../src/data/allergens.ts";

const CORAL = "#e85d4f";
const CREAM_DARK = "#f0ebe6";
const MUTED = "#5c5c5c";
const BLACK = "#1a1a1a";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(rootDir, "public/docs/sues-burgers-allergen-information.pdf");

const PAGE_MARGIN = 36;
const ITEM_COL_WIDTH = 148;
const ALLERGEN_COL_WIDTH = 34;
const ROW_HEIGHT = 22;
const HEADER_ROW_HEIGHT = 36;
const SECTION_GAP = 14;

function symbolFor(status: "contains" | "traces") {
  return status === "contains" ? "X" : "O";
}

async function generateAllergenPdf() {
  await mkdir(dirname(outputPath), { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margins: { top: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN, right: PAGE_MARGIN },
    info: {
      Title: "Sue's Burgers & Shakes — Allergen Information",
      Author: "Sue's Burgers & Shakes",
      Subject: "Menu allergen matrix",
    },
  });

  const stream = createWriteStream(outputPath);
  doc.pipe(stream);

  const pageBottom = doc.page.height - PAGE_MARGIN;
  let y = PAGE_MARGIN;

  const ensureSpace = (height: number) => {
    if (y + height <= pageBottom) return;

    doc.addPage();
    y = PAGE_MARGIN;
  };

  const drawTitleBlock = () => {
    doc.font("Helvetica-Bold").fontSize(22).fillColor(CORAL);
    doc.text("Sue's Burgers & Shakes", PAGE_MARGIN, y, { lineBreak: false });
    y += 28;

    doc.fontSize(18).fillColor(BLACK);
    doc.text("Allergen Information", PAGE_MARGIN, y, { lineBreak: false });
    y += 24;

    doc.font("Helvetica").fontSize(9.5).fillColor(MUTED);
    doc.text(allergenPage.intro, PAGE_MARGIN, y, {
      width: doc.page.width - PAGE_MARGIN * 2,
      lineGap: 2,
    });
    y += doc.heightOfString(allergenPage.intro, {
      width: doc.page.width - PAGE_MARGIN * 2,
      lineGap: 2,
    }) + 10;

    doc.font("Helvetica-Bold").fontSize(10).fillColor(CORAL);
    doc.text("Information Key", PAGE_MARGIN, y, { lineBreak: false });
    y += 14;

    doc.font("Helvetica").fontSize(9).fillColor(BLACK);
    doc.text("X  —  Item contains this allergen", PAGE_MARGIN, y, { lineBreak: false });
    y += 12;
    doc.text("O  —  Traces of allergen may be present", PAGE_MARGIN, y, { lineBreak: false });
    y += 18;
  };

  const drawTableHeader = (x: number, startY: number) => {
    const tableWidth = ITEM_COL_WIDTH + allergenColumns.length * ALLERGEN_COL_WIDTH;

    doc.save();
    doc.rect(x, startY, tableWidth, HEADER_ROW_HEIGHT).fill("#faf7f4");
    doc.restore();

    doc.font("Helvetica-Bold").fontSize(7.5).fillColor(CORAL);
    doc.text("Item", x + 6, startY + 6, { width: ITEM_COL_WIDTH - 10, lineBreak: false });

    allergenColumns.forEach((column, index) => {
      const colX = x + ITEM_COL_WIDTH + index * ALLERGEN_COL_WIDTH;
      doc.text(column.label, colX + 2, startY + 4, {
        width: ALLERGEN_COL_WIDTH - 4,
        align: "center",
        lineGap: 0,
      });
      doc.font("Helvetica").fontSize(6.5).fillColor(MUTED);
      doc.text(`(${column.abbr})`, colX + 2, startY + 16, {
        width: ALLERGEN_COL_WIDTH - 4,
        align: "center",
        lineBreak: false,
      });
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(CORAL);
    });

    doc.strokeColor(CREAM_DARK).lineWidth(1);
    doc.moveTo(x, startY + HEADER_ROW_HEIGHT).lineTo(x + tableWidth, startY + HEADER_ROW_HEIGHT).stroke();
  };

  const drawDataRow = (
    x: number,
    startY: number,
    itemName: string,
    statuses: ("contains" | "traces")[],
    shaded: boolean,
  ) => {
    const tableWidth = ITEM_COL_WIDTH + allergenColumns.length * ALLERGEN_COL_WIDTH;

    if (shaded) {
      doc.save();
      doc.rect(x, startY, tableWidth, ROW_HEIGHT).fill("#fcfaf8");
      doc.restore();
    }

    doc.font("Helvetica-Bold").fontSize(8).fillColor(BLACK);
    doc.text(itemName, x + 6, startY + 6, {
      width: ITEM_COL_WIDTH - 10,
      lineBreak: false,
    });

    statuses.forEach((status, index) => {
      const colX = x + ITEM_COL_WIDTH + index * ALLERGEN_COL_WIDTH + 7;
      const colY = startY + 4;
      const symbol = symbolFor(status);

      if (status === "contains") {
        doc.save();
        doc.roundedRect(colX, colY, 16, 14, 2).fill(CORAL);
        doc.restore();
        doc.font("Helvetica-Bold").fontSize(9).fillColor("#ffffff");
      } else {
        doc.save();
        doc.roundedRect(colX, colY, 16, 14, 2).fill(CREAM_DARK);
        doc.restore();
        doc.font("Helvetica-Bold").fontSize(9).fillColor(BLACK);
      }

      doc.text(symbol, colX, colY + 2, { width: 16, align: "center", lineBreak: false });
    });

    doc.strokeColor(CREAM_DARK).lineWidth(0.5);
    doc
      .moveTo(x, startY + ROW_HEIGHT)
      .lineTo(x + tableWidth, startY + ROW_HEIGHT)
      .stroke();
  };

  drawTitleBlock();

  for (const section of allergenSections) {
    ensureSpace(SECTION_GAP + 18 + HEADER_ROW_HEIGHT + ROW_HEIGHT);

    y += SECTION_GAP;
    doc.font("Helvetica-Bold").fontSize(12).fillColor(CORAL);
    doc.text(section.title, PAGE_MARGIN, y, { lineBreak: false });
    y += 16;

    drawTableHeader(PAGE_MARGIN, y);
    y += HEADER_ROW_HEIGHT;

    section.rows.forEach((row, rowIndex) => {
      ensureSpace(ROW_HEIGHT + 4);
      const statuses = allergenColumns.map((column) => row.allergens[column.key]);
      drawDataRow(PAGE_MARGIN, y, row.name, statuses, rowIndex % 2 === 1);
      y += ROW_HEIGHT;
    });
  }

  ensureSpace(80);
  y += SECTION_GAP;

  doc.font("Helvetica").fontSize(8.5).fillColor(MUTED);
  doc.text(allergenPage.disclaimer, PAGE_MARGIN, y, {
    width: doc.page.width - PAGE_MARGIN * 2,
    lineGap: 2,
  });
  y +=
    doc.heightOfString(allergenPage.disclaimer, {
      width: doc.page.width - PAGE_MARGIN * 2,
      lineGap: 2,
    }) + 8;

  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(BLACK);
  doc.text(`Last updated ${allergenPage.lastUpdated}`, PAGE_MARGIN, y, { lineBreak: false });

  doc.end();

  await new Promise<void>((resolvePromise, reject) => {
    stream.on("finish", () => resolvePromise());
    stream.on("error", reject);
  });

  console.info(`[allergen-pdf] Wrote ${outputPath}`);
}

generateAllergenPdf().catch((error) => {
  console.error("[allergen-pdf] Generation failed:", error);
  process.exit(1);
});
