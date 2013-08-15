require "bundler/gem_tasks"
require "k4slide"

K4slide::Tasks.install do |config|
  assets_dir = File.expand_path(File.join(File.dirname(__FILE__), 'assets-src'))
  compiled_dir = File.expand_path(File.join(File.dirname(__FILE__), 'assets'))

  # closure
  config.closure.target_dir = File.join(assets_dir, 'javascripts')
  config.closure.compiled_dir = File.join(compiled_dir)
  # SCSS
  config.scss.target_dir = File.join(assets_dir, 'stylesheets')
  config.scss.compiled_dir = File.join(compiled_dir)

  puts config.inspect
end
