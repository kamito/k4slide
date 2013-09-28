require 'erb'

module K4slide
  class MarkdownCompiler

    def initialize(compiler)
      @compiler = compiler
    end

    def to_slide(md_src)
      @body = @compiler.markdown.compile(md_src)
      @title = 'example'

      layout_src = read_layout_template()
      erb = ERB.new(layout_src)
      source = erb.result(binding)
      return source
    end

    def read_layout_template
      layout_dir = File.expand_path(File.join(File.dirname(__FILE__), 'erb'))
      layout_template = File.join(layout_dir, 'layout.html.erb')
      src = File.read(layout_template)
      return src
    end
  end
end
