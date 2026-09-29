import Foundation
import Vision

struct ImageBarcode {
  let value: String
  let format: String
}

enum BarcodeImageReader {
  static func format(of symbology: VNBarcodeSymbology) -> String? {
    switch symbology {
    case .ean13: return "EAN13"
    case .ean8: return "EAN8"
    case .upce: return "UPC_E"
    case .code128: return "CODE128"
    case .code39, .code39Checksum, .code39FullASCII, .code39FullASCIIChecksum: return "CODE39"
    case .qr, .microQR: return "QR_CODE"
    case .pdf417, .microPDF417: return "PDF417"
    case .dataMatrix: return "DATA_MATRIX"
    case .aztec: return "AZTEC"
    case .codabar: return "CODABAR"
    case .itf14, .i2of5, .i2of5Checksum: return "ITF14"
    case .gs1DataBar, .gs1DataBarExpanded, .gs1DataBarLimited: return "GS1_DATABAR"
    default: return nil
    }
  }

  static let symbologies: [VNBarcodeSymbology] = [
    .ean13, .ean8, .upce, .code128,
    .code39, .code39Checksum, .code39FullASCII, .code39FullASCIIChecksum,
    .qr, .microQR, .pdf417, .microPDF417, .dataMatrix, .aztec, .codabar,
    .itf14, .i2of5, .i2of5Checksum,
    .gs1DataBar, .gs1DataBarExpanded, .gs1DataBarLimited,
  ]

  static func read(url: URL) throws -> [ImageBarcode] {
    let request = VNDetectBarcodesRequest()
    #if targetEnvironment(simulator)
    request.revision = 1
    #endif
    let supported = Set((try? request.supportedSymbologies()) ?? symbologies)
    request.symbologies = symbologies.filter { supported.contains($0) }
    let handler = VNImageRequestHandler(url: url, options: [:])
    try handler.perform([request])
    var seen = Set<String>()
    return (request.results ?? []).compactMap { observation in
      guard
        let value = observation.payloadStringValue, !value.isEmpty,
        let format = format(of: observation.symbology),
        seen.insert(value).inserted
      else { return nil }
      return ImageBarcode(value: value, format: format)
    }
  }
}
