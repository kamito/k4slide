require "bundler/gem_tasks"
require "k4slide"


K4_ROOT = File.expand_path(File.dirname(__FILE__))

K4slide::Tasks.install do |config|
  src_dir = File.expand_path(File.join(File.dirname(__FILE__), 'assets-src'))
  assets_dir = File.expand_path(File.join(File.dirname(__FILE__), 'assets'))

  # closure
  config.closure.level = :script # :simple
  config.closure.target_dir = File.join(src_dir, 'javascripts')
  config.closure.compiled_dir = File.join(assets_dir)
  # config.closure.load_paths << File.join(src_dir, 'javascripts/lib')
  # SCSS
  config.scss.target_dir = File.join(src_dir, 'stylesheets')
  config.scss.compiled_dir = File.join(assets_dir)

  # puts config.inspect
end
