import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';

type Args = {
  enabled?: boolean;
};

/**
 * Enables the `rollup-plugin-visualizer` plugin within Vite
 * @example
 * ```
 * const visualizer = withVisualizer({ enabled: true })
 * 
 * // Instatiation
 * defineConfig({ plugins: [ visualizer({ emitFile: true }) ]})
 * ```
 * 
 * @see https://v3.vitejs.dev/config/shared-options.html#plugins
 * @see https://v3.vitejs.dev/guide/using-plugins.html#adding-a-plugin
 * @link https://github.com/btd/rollup-plugin-visualizer
 */
function withVisualizer({ enabled }: Args) {
  return async function(options?: PluginVisualizerOptions) {

    if (enabled) {
      try {
        const { visualizer } = await import('rollup-plugin-visualizer');
    
        return visualizer(options);
      } catch (e: unknown) {
    
        if (e instanceof Error) {
          console.error(e);
        }
    
        return Promise.reject(e);
      }
    }

    return false;

  };
}

export default withVisualizer;
