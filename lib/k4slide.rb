require "k4slide/version"
require 'active_support'

module K4slide
  extend ActiveSupport::Autoload

  autoload :MarkdownCompiler
  autoload :MarkdownRenderer
  autoload :Tasks
end
