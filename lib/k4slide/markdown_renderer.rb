module K4slide
  class MarkdownRenderer < ::K4compiler::MarkdownRenderer

    attr_accessor :config

    def initialize(*args)
      super(*args)
      @started_ = false
      @page_ = 0
    end

    def header(text, header_level)
      @page_ += 1
      html_ = ""
      html_ << "</div>\n\n" if @started_
      html_ << <<__HEAD__
<div role="slide" page="#{@page_}">
<h#{header_level}>#{text}</h#{header_level}>
__HEAD__
      @started_ = true
      return html_
    end
  end
end
