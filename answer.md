1. In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?


[describe] breaks your test suite into components. Depending on your test strategy, you might have a describe for each function in your class, each module of your plugin, or each user-facing piece of functionality.

You can also nest describes to further subdivide the suite.

[it] is where you perform individual tests. You should be able to describe each test like a little sentence, such as "it calculates the area when the radius is set".


1. What is the point of `Test Driven Development`? What do you think about this approach?
If all test cases now pass, the programmer can be confident that the new code meets the test requirements, and does not break or degrade any existing features. If they do not, the new code must be adjusted until they do.


TDD only increases the odds of good design, but certainly does not guarantee it. It still requires skill to make the right design decisions.


3. Mention three types of automated tests.
  - unit testing
  - integration tesitng
  - system testing