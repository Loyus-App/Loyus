Pod::Spec.new do |s|
  s.name           = 'WindowCrossfade'
  s.version        = '1.0.0'
  s.summary        = 'Crossfades the whole window between two looks.'
  s.description    = 'Covers the key window with a snapshot, then fades it out once the new look is on screen.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.license        = 'MIT'
  s.platforms      = {
    :ios => '16.4'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }

  s.source_files = "**/*.{h,m,mm,swift}"
end
