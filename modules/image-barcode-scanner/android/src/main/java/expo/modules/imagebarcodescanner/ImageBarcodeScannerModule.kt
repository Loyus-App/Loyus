package expo.modules.imagebarcodescanner

import android.net.Uri
import com.google.android.gms.tasks.Tasks
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

private val FORMATS = mapOf(
  Barcode.FORMAT_EAN_13 to "EAN13",
  Barcode.FORMAT_EAN_8 to "EAN8",
  Barcode.FORMAT_UPC_A to "UPC_A",
  Barcode.FORMAT_UPC_E to "UPC_E",
  Barcode.FORMAT_CODE_128 to "CODE128",
  Barcode.FORMAT_CODE_39 to "CODE39",
  Barcode.FORMAT_QR_CODE to "QR_CODE",
  Barcode.FORMAT_PDF417 to "PDF417",
  Barcode.FORMAT_DATA_MATRIX to "DATA_MATRIX",
  Barcode.FORMAT_AZTEC to "AZTEC",
  Barcode.FORMAT_CODABAR to "CODABAR",
  Barcode.FORMAT_ITF to "ITF"
)

private val SCANNER_OPTIONS = BarcodeScannerOptions.Builder()
  .setBarcodeFormats(
    Barcode.FORMAT_EAN_13,
    Barcode.FORMAT_EAN_8,
    Barcode.FORMAT_UPC_A,
    Barcode.FORMAT_UPC_E,
    Barcode.FORMAT_CODE_128,
    Barcode.FORMAT_CODE_39,
    Barcode.FORMAT_QR_CODE,
    Barcode.FORMAT_PDF417,
    Barcode.FORMAT_DATA_MATRIX,
    Barcode.FORMAT_AZTEC,
    Barcode.FORMAT_CODABAR,
    Barcode.FORMAT_ITF
  )
  .build()

internal class ImageScanFailedException(cause: Throwable) :
  CodedException("Could not read barcodes from the image: ${cause.message}", cause)

class ImageBarcodeScannerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ImageBarcodeScanner")

    AsyncFunction("scanImage") { uri: String ->
      val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      val scanner = BarcodeScanning.getClient(SCANNER_OPTIONS)
      try {
        val image = InputImage.fromFilePath(context, Uri.parse(uri))
        val barcodes = Tasks.await(scanner.process(image))
        barcodes
          .mapNotNull { barcode ->
            val value = barcode.rawValue?.takeIf { it.isNotEmpty() }
            val format = FORMATS[barcode.format]
            if (value == null || format == null) null else mapOf("value" to value, "format" to format)
          }
          .distinctBy { it["value"] }
      } catch (error: Exception) {
        throw ImageScanFailedException(error.cause ?: error)
      } finally {
        scanner.close()
      }
    }
  }
}
