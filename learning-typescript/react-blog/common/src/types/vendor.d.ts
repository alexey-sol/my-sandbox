// Mocha. [1]
declare const after: any;
declare const before: any;

// [1]. @types/jest and @types/mocha conflict since these frameworks have some
// global variables with the same name. So I resorted to remove @types/mocha.
// There're "stubs" for "after" and "before" (Jest doesn't have suchlike
// functions).