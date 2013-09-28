require 'erb'

module K4slide
  class MarkdownCompiler

    def initialize(compiler)
      @compiler = compiler
    end

    def to_slide(md_src)
      @body = @compiler.markdown.compile(md_src)
      @title = 'example'
      @js_assets = read_js_assets()
      @css_assets = read_css_assets()

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

    def read_js_assets()
      js_files = ['k4slide.js']
      return js_files.map do |js_file|
        File.read(File.join(asset_src_root, js_file))
      end
    end

    def read_css_assets()
      css_files = ['k4slide.css']
      return css_files.map do |css_file|
        File.read(File.join(asset_src_root, css_file))
      end
    end

    def asset_src_root
      return File.expand_path(File.join(File.dirname(__FILE__), "../../assets"))
    end
  end
end
