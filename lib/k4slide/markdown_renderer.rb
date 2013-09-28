module K4slide
  class MarkdownRenderer < ::K4compiler::MarkdownRenderer

    attr_accessor :config

    def initialize(*args)
      super(*args)
      @started_ = false
      @level_ = 0
      @page_ = 0
      @current_ = nil
    end

    def header(text, header_level)
      @page_ += 1
      @level_ = header_level

      html = ""
      html << "</div>\n\n" if @started_
      html << <<__HEAD__
<div role="slide" page="#{@page_}" slide-level="#{header_level}">
<h#{header_level}>#{text}</h#{header_level}>
__HEAD__
      @current_ = html
      @started_ = true
      return html
    end

  end
end
