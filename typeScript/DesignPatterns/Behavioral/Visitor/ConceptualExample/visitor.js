/**
 * Each Concrete Component must implement the `accept` method in such a way that
 * it calls the visitor's method corresponding to the component's class.
 */
var ConcreteComponentA = /** @class */ (function () {
    function ConcreteComponentA() {
    }
    /**
     * Note that we're calling `visitConcreteComponentA`, which matches the
     * current class name. This way we let the visitor know the class of the
     * component it works with.
     */
    ConcreteComponentA.prototype.accept = function (visitor) {
        visitor.visitConcreteComponentA(this);
    };
    /**
     * Concrete Components may have special methods that don't exist in their
     * base class or interface. The Visitor is still able to use these methods
     * since it's aware of the component's concrete class.
     */
    ConcreteComponentA.prototype.exclusiveMethodOfConcreteComponentA = function () {
        return 'A';
    };
    return ConcreteComponentA;
}());
var ConcreteComponentB = /** @class */ (function () {
    function ConcreteComponentB() {
    }
    /**
     * Same here: visitConcreteComponentB => ConcreteComponentB
     */
    ConcreteComponentB.prototype.accept = function (visitor) {
        visitor.visitConcreteComponentB(this);
    };
    ConcreteComponentB.prototype.specialMethodOfConcreteComponentB = function () {
        return 'B';
    };
    return ConcreteComponentB;
}());
/**
 * Concrete Visitors implement several versions of the same algorithm, which can
 * work with all concrete component classes.
 *
 * You can experience the biggest benefit of the Visitor pattern when using it
 * with a complex object structure, such as a Composite tree. In this case, it
 * might be helpful to store some intermediate state of the algorithm while
 * executing visitor's methods over various objects of the structure.
 */
var ConcreteVisitor1 = /** @class */ (function () {
    function ConcreteVisitor1() {
    }
    ConcreteVisitor1.prototype.visitConcreteComponentA = function (element) {
        console.log("".concat(element.exclusiveMethodOfConcreteComponentA(), " + ConcreteVisitor1"));
    };
    ConcreteVisitor1.prototype.visitConcreteComponentB = function (element) {
        console.log("".concat(element.specialMethodOfConcreteComponentB(), " + ConcreteVisitor1"));
    };
    return ConcreteVisitor1;
}());
var ConcreteVisitor2 = /** @class */ (function () {
    function ConcreteVisitor2() {
    }
    ConcreteVisitor2.prototype.visitConcreteComponentA = function (element) {
        console.log("".concat(element.exclusiveMethodOfConcreteComponentA(), " + ConcreteVisitor2"));
    };
    ConcreteVisitor2.prototype.visitConcreteComponentB = function (element) {
        console.log("".concat(element.specialMethodOfConcreteComponentB(), " + ConcreteVisitor2"));
    };
    return ConcreteVisitor2;
}());
/**
 * The client code can run visitor operations over any set of elements without
 * figuring out their concrete classes. The accept operation directs a call to
 * the appropriate operation in the visitor object.
 */
function clientCode(components, visitor) {
    // ...
    for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
        var component = components_1[_i];
        component.accept(visitor);
    }
    // ...
}
var components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
];
console.log('The client code works with all visitors via the base Visitor interface:');
var visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');
console.log('It allows the same client code to work with different types of visitors:');
var visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
