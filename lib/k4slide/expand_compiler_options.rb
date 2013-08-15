require 'active_support/core_ext/hash'

module K4compiler

  class Closure
    class << self
      def expand_options
        opt = {
          :target_dir => nil,
          :compiled_dir => nil,
          :with_closure => true,
          :namespace_suffix => 'App',
        }
        return original_options.update(opt).with_indifferent_access()
      end
      alias :original_options :options
      alias :options :expand_options
    end
  end

  class Scss
    class << self
      def expand_options
        opt = {
          :target_dir => nil,
          :compiled_dir => nil,
          :ext => 'scss',
        }
        return original_options.update(opt).with_indifferent_access()
      end
      alias :original_options :options
      alias :options :expand_options
    end
  end

  class Markdown
    class << self
      def expand_options
        opt = {
          :target_dir => nil,
          :compiled_dir => nil,
        }
        return original_options.update(opt).with_indifferent_access()
      end
      alias :original_options :options
      alias :options :expand_options
    end
  end
end
