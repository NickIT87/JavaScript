var nums = 42;
var testes = 'Hello world';
console.log(testes, nums);
var arsr1 = [1, 2, 4];
var arsr2 = [234, 23, 45];
function majority(a, b) {
    var temp;
    var _loop_1 = function (i) {
        b.forEach(function (element) {
            console.log(i + element);
        });
    };
    for (var i in a) {
        _loop_1(i);
    }
    //return 0
}
majority(arsr1, arsr2);
