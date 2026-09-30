Pod::Spec.new do |s|
  s.name           = 'ImageBarcodeScanner'
  s.version        = '1.0.0'
  s.summary        = 'Reads barcodes from still images with Apple Vision.'
  s.description    = 'Reads barcodes from still images with Apple Vision.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.license        = 'MIT'
  s.platforms      = {
    :ios => '16.4'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.frameworks = 'Vision', 'CoreML'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }

  s.source_files = "**/*.{h,m,mm,swift}"
end
