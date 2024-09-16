/**
 * A module for testing for and extracting names from options (e.g. `--one`, `-o`)
 */

class Arg {
  constructor (re) {
    this.re = re
  }

  test (arg) {
    return this.re.test(arg)
  }
}

const isShort = new Arg(/^-([^\d-])$/)
const isLong = new Arg(/^--(\S+)/)
const isCombined = new Arg(/^-([^\d-]{2,})$/)
const isOption = function (arg) {
  return isShort.test(arg) || isLong.test(arg) || isCombined.test(arg)
}
const optEquals = new Arg(/^(--\S+)=(.*)/)

export { isShort, isLong, isCombined, isOption, optEquals }
