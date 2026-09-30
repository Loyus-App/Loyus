import ExpoModulesCore

public class ImageBarcodeScannerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ImageBarcodeScanner")

    AsyncFunction("scanImage") { (url: URL) throws -> [[String: String]] in
      do {
        return try BarcodeImageReader.read(url: url).map { barcode in
          ["value": barcode.value, "format": barcode.format]
        }
      } catch {
        throw ImageScanFailedException(error.localizedDescription)
      }
    }
  }
}

internal final class ImageScanFailedException: GenericException<String>, @unchecked Sendable {
  override var reason: String {
    "Could not read barcodes from the image: \(param)"
  }
}
