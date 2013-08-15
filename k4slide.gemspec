# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'k4slide/version'

Gem::Specification.new do |spec|
  spec.name          = "k4slide"
  spec.version       = K4slide::VERSION
  spec.authors       = ["Shinichirow Kamito"]
  spec.email         = ["kamito@i3-systems.com"]
  spec.description   = "k4 slide"
  spec.summary       = "k4 slide"
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "k4compiler"
  spec.add_dependency "rake"
  spec.add_dependency "activesupport", "~> 3.2"

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rspec"
  spec.add_development_dependency "guard-rspec"
end
