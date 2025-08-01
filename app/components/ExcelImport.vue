<template>
  <div class="space-y-4">
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
    >
      <Icon name="upload" class="w-12 h-12 mx-auto text-gray-400 mb-4" />

      <div class="space-y-2">
        <p class="text-sm text-gray-600">
          Choose an Excel file or drag and drop
        </p>
        <p class="text-xs text-gray-500">
          Need help? Download our example file below
        </p>

        <input
          ref="fileInput"
          type="file"
          accept=".xlsx,.xls"
          @change="handleFileChange"
          class="hidden"
        />

        <BaseButton
          type="button"
          variant="secondary"
          @click="fileInput?.click()"
        >
          Select File
        </BaseButton>
      </div>
    </div>

    <!-- File Info -->
    <div v-if="selectedFile" class="bg-blue-50 p-4 rounded-lg">
      <div class="flex items-center gap-3">
        <Icon name="file" class="w-5 h-5 text-blue-600" />
        <div class="flex-1">
          <p class="text-sm font-medium text-blue-900">
            {{ selectedFile.name }}
          </p>
          <p class="text-xs text-blue-700">
            {{ formatFileSize(selectedFile.size) }}
          </p>
        </div>
        <BaseButton
          type="button"
          variant="primary"
          size="sm"
          @click="processFile"
          :disabled="processing"
        >
          {{ processing ? "Processing..." : "Import" }}
        </BaseButton>
      </div>
    </div>

    <!-- Format Guide -->
    <div class="bg-gray-50 p-4 rounded-lg text-sm">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium text-gray-900">Excel Format Guide:</h4>
        <a
          href="/example.xlsx"
          download="team-builder-example.xlsx"
          class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <Icon name="download" class="w-4 h-4" />
          Download Example
        </a>
      </div>
      <ul class="space-y-1 text-gray-600">
        <li>• <strong>Column A:</strong> Player Name (required)</li>
        <li>• <strong>Column B:</strong> Arrival Status (required)</li>
        <li>• <strong>Column C:</strong> Position (optional)</li>
        <li>
          • <strong>Column D+:</strong> Additional strength values for weighted
          average (optional)
        </li>
      </ul>
      <p class="text-xs text-gray-500 mt-2 italic">
        💡 Tip: Download the example file above to see the exact format with
        sample data
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as XLSX from "xlsx";
import { Player, Position } from "~/types";
import { Calculator } from "~/utils";

interface Emits {
  (e: "import", players: Player[]): void;
}

const emit = defineEmits<Emits>();

// Reactive data
const fileInput = ref<HTMLInputElement>();
const selectedFile = ref<File | null>(null);
const processing = ref(false);

// Methods
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    selectedFile.value = file;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const processFile = async () => {
  if (!selectedFile.value) return;

  processing.value = true;

  try {
    const players = await parseExcelFile(selectedFile.value);
    emit("import", players);
  } catch (error) {
    console.error("Error processing Excel file:", error);
    alert("Error processing Excel file. Please check the format.");
  } finally {
    processing.value = false;
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  }
};

const parseExcelFile = (file: File): Promise<Player[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error("No data found"));
          return;
        }

        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];

        if (!sheetName) {
          reject(new Error("No sheets found"));
          return;
        }

        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          reject(new Error("Sheet not found"));
          return;
        }

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as any[][];

        // Skip header row
        const excelData = jsonData.slice(1);
        const players: Player[] = [];

        for (const row of excelData) {
          if (row[0] && row[1]) {
            // Name and strength are required
            let strengths: number[] = [];

            // Collect additional strength values from column D onwards
            for (let i = 3; i < row.length; i++) {
              if (typeof row[i] === "number" && row[i] > 0) {
                strengths.push(row[i]);
              }
            }

            // Calculate final strength
            let finalStrength: number;
            if (strengths.length > 0) {
              finalStrength = Calculator.getWeightedAvgStrength(strengths);
            } else {
              finalStrength = Number(row[1]) || 0;
            }

            const player = new Player(
              String(row[0]).trim(),
              finalStrength,
              (row[2] as Position) || undefined
            );

            players.push(player);
          }
        }

        resolve(players);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsBinaryString(file);
  });
};
</script>
