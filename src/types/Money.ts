export type Money = {
   /**
    * The unit of money amount in micros. For example, $1 USD would be represented as 1000000 micros.
    */
   micros?: string;
   /**
    * The currency code, such as "USD" or "EUR."
    */
   currencyCode?: string;
};