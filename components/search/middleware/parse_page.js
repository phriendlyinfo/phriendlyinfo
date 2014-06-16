var number = /^\d+$/;

/**
 * Validates the request `page` param, defaults
 * to 0 in the event that the param is anything but
 * a valid number. Also parses the number from a
 * string to a number.
 */

exports.parsePage = function *(next) {
  var page = 0, reqPage = this.request.body.page;
  if (number.test(reqPage)) page = +reqPage;
  this.request.body.page = page;
  yield next;
}
