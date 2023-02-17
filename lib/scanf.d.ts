// Type definitions for node-scanf
// Project: https://github.com/Lellansin/node-scanf
// Definitions by: Jeongho Nam <http://samchon.org>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "scanf"
{
	export = __node_scanf.scanf;
}

declare namespace __node_scanf {

	interface FormatMap {
		"d": number;
		"ld": number;
		"llu": number;
		"lu": number;
		"u": number;
		"X": number;
		"x": number;
		"O": number;
		"o": number;
		"a": number;
		"f": number;
		"c": string;
		"s": string;
		"S": string;
	}

	type NumberStrings = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

	type FormatArrayTrimNumber<S extends string> = S extends `%${NumberStrings}${infer R}`
		? FormatArrayTrimNumber<`%${R}`>
		: FormatArray3<S>;

	type FormatArray3<S extends string> = S extends `%${infer K1}${infer K2}${infer K3}${infer R}`
		? `${K1}${K2}${K3}` extends keyof FormatMap ? [FormatMap[`${K1}${K2}${K3}`], ...FormatArray<R>] : FormatArray2<S>
		: FormatArray2<S>
	
	type FormatArray2<S extends string> = S extends `%${infer K1}${infer K2}${infer R}`
		? `${K1}${K2}` extends keyof FormatMap ? [FormatMap[`${K1}${K2}`], ...FormatArray<R>] : FormatArray1<S>
		: FormatArray1<S>
	
	type FormatArray1<S extends string> = S extends `%${infer K1}${infer R}`
		? `${K1}` extends keyof FormatMap ? [FormatMap[`${K1}`], ...FormatArray<R>] : never
		: never
	
	type FormatArray<S extends string> = S extends `${any}%${infer R}`
		? FormatArrayTrimNumber<`%${R}`>
		: []
	
	type SingleValueOrArray<A extends any[]> = A extends [infer F] ? F : A;

	type Format<S extends string> = SingleValueOrArray<FormatArray<S>>;
	
	type GroupJson<A1 extends string[], A2 extends any[]> = A1 extends [] ? {} : A2 extends [] ? {} :
		A1 extends [infer K1, ...infer R1] ? A2 extends [infer V1, ...infer R2] ? { [K in K1]: V1 } & GroupJson<R1, R2> : {} : {};

	type FormatJson<S extends string, A extends string[]> = GroupJson<A, FormatArray<S>>

	/* ------------------------------------------------------------
		SCANF - FROM STDIN
	------------------------------------------------------------ */

	/**
	 * <p> Reads formatted data from stdin. </p>
	 * 
	 * <p> Reads data from stdin and stores them according to the parameter <i>format</i> into an array to be returned. </p>
	 * 
	 * @param format The format contains a sequence of characters that control how characters extracted from the stream are tread.
	 * @return An array containing data constructed from stdin with the <i>format</i>.
	 */
	function scanf<S extends string>(format: S): Format<S>;

	/**
	 * <p> Reads formatted data from stdin. </p>
	 * 
	 * <p> Reads data from stdin and stores them according to the parameter <i>format</i> into a JSON object following sequence of <i>names</i>. </p>
	 * 
	 * @param format The format contains a sequence of characters that control how characters extracted from the stream are tread.
	 * @param names Names of data constructed from stdin with the <i>format</i>.
	 * 
	 * @return A JSON object containing data constructed from stdin with the <i>format</i> and following <i>names</i>.
	 */
	function scanf<S extends string, A extends string[]>(format: S, ...names: A): FormatJson<S, A>;

	/* ------------------------------------------------------------
		SSCANF - FROM SOURCE STRING
	------------------------------------------------------------ */
	namespace scanf {

		/**
		 * <p> Reads formatted data from string. </p>
		 * 
		 * <p> Reads data from <i>source</i> and stores them according to the parameter <i>format</i> into an array to be returned. </p>
		 * 
		 * @param source Source string to retrieve data.
		 * @param format The format contains a sequence of characters that control how characters extracted from the stream are tread.
		 * 
		 * @return An array containing data constructed from string with the <i>format</i>.
		 */
		function sscanf<S extends string>(source: string, format: S): Format<S>;

		/**
		 * <p> Reads formatted data from string. </p>
		 * 
		 * <p> Reads data from <i>source</i> and stores them according to the parameter <i>format</i> into a JSON object following sequence of <i>names</i>. </p>
		 * 
		 * @param source Source string to retrieve data.
		 * @param format The format contains a sequence of characters that control how characters extracted from the stream are tread.
		 * @param names Names of data constructed from string with the <i>format</i>.
		 * 
		 * @return A JSON object containing data constructed from string with the <i>format</i> and following <i>names</i>.
		 */
		function sscanf<S extends string, A extends string[]>(source: string, format: S, ...names: A): FormatJson<S, A>;
	}
}
