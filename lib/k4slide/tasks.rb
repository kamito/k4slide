
require 'rake/clean'
require 'k4compiler'
require 'k4slide/expand_compiler_options'

module K4slide

  module Tasks
    def self.install(&block)
      instance = K4slideTasks.new
      instance.install(&block)
    end

    class K4slideTasks
      include Rake::DSL

      def initialize
        @compiler = nil
      end

      def install(&block)
        @compiler = ::K4compiler.setup(&block)
        @config = @compiler.config

        namespace :k4s do
          namespace :compile do
            desc 'Compile JavaScript source with Closure Library.'
            task :closure => get_closure_sources()

            desc 'Compile SASS sources'
            task :sass => get_sass_source()

            desc 'Compile Markdown sources'
            task :markdown do
              puts "Compile Markdown"
            end

            desc 'Compile sources.'
            task :all => ['k4s:compile:closure', 'k4s:compile:sass', 'k4s:compile:markdown']
          end

          namespace :example do
            task :md2s => (['k4s:example:compile'] + example_markdown_targets())
            task :compile => ['k4s:compile:all']
          end
        end
      end

      # @return [FileList]
      def get_closure_sources
        target_files = []
        source_dir = @config.closure.target_dir
        compiled_dir = @config.closure.compiled_dir

        depends_files = []
        @config.closure.load_paths << source_dir
        @config.closure.load_paths.each do |load_path|
          depends_files += FileList[File.join(load_path, '**/*.js')].flatten if load_path
        end

        ns_suffix = @config.closure.namespace_suffix || 'App'

        filelist = FileList[File.join(source_dir, '*.js')]
        filelist.each do |source_path|
          source_basename = File.basename(source_path)
          target_path = File.join(compiled_dir, source_basename)
          same_name_dir = source_path.gsub(/\.js$/, '')
          depends = depends_files.dup
          depends.unshift(FileList[File.join(same_name_dir, '**/*.js')].flatten)
          depends.unshift(source_path)
          depends = depends.flatten

          file(target_path => depends) do |t, args|
            basename = File.basename(t.name).gsub(/\.js$/, '')
            namespace = "#{basename}.#{ns_suffix}"
            js_source = @compiler.closure.compile(namespace)
            File.open(target_path, 'w') do |io|
              io.write(js_source)
            end
          end

          target_files << target_path
        end

        return target_files
      end

      # @return [FileList]
      def get_sass_source()
        target_files = []
        source_dir = @config.scss.target_dir
        compiled_dir = @config.scss.compiled_dir
        ext = @config.scss.ext || 'scss'

        @config.scss.load_paths << source_dir

        depends_files = []
        @config.scss.load_paths.each do |load_path|
          depends_files += FileList[File.join(load_path, "**/*.#{ext}")].flatten if load_path
        end

        filelist = FileList[File.join(source_dir, "*.#{ext}")]
        filelist.each do |source_path|
          source_basename = File.basename(source_path)
          next if source_basename =~ /^_/

          source_basename = source_basename.gsub(/#{ext}$/, 'css')
          target_path = File.join(compiled_dir, source_basename)
          depends = depends_files.dup
          depends.unshift(source_path)

          file(target_path => depends) do |t, args|
            puts t.name
            src = File.read(source_path)
            css_source = @compiler.scss.compile(src)
            File.open(target_path, 'w') do |io|
              io.write(css_source)
            end
          end

          target_files << target_path
        end

        return target_files
      end

      # Compiling example markdown file
      def example_markdown_targets()
        target_files = []

        example_dir = File.join(K4_ROOT, 'example')
        ext = 'md'
        filelist = FileList[File.join(example_dir, "*.#{ext}")]
        filelist.each do |source_path|
          source_basename = File.basename(source_path)
          next if source_basename =~ /^_/

          source_basename = source_basename.gsub(/#{ext}$/, 'html')
          target_path = File.join(example_dir, source_basename)
          # File.delete(target_path) if File.exists?(target_path)

          file(target_path) do |t, args|
            puts t.name
            src = File.read(source_path)
            compiler_ = MarkdownCompiler.new(@compiler)
            html_source = compiler_.to_slide(src)
            File.open(target_path, 'w') do |io|
              io.write(html_source)
            end
          end
          target_files << target_path
        end
        return target_files
      end
    end
  end
end
