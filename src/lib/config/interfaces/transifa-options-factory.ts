import { TransifaModuleOptions } from './transifa-module-options'

/**
 * A factory interface for creating Transifa module options.
 * Implement this interface to provide dynamic configuration for the TransifaModule.
 */
export interface TransifaOptionsFactory {
  /**
   * Creates and returns the configuration options for the TransifaModule.
   * This can be either a synchronous or asynchronous operation.
   *
   * @returns A `TransifaModuleOptions` object or a promise resolving to one.
   */
  createTransifaOptions(): Promise<TransifaModuleOptions> | TransifaModuleOptions
}
