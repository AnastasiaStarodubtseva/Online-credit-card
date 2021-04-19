# Credit Card Form

The online credit card project was written using HTML, CSS, React.js and Redux.

## [View demo](https://anastasiastarodubtseva.github.io/Online-credit-card/)

It was written to practice my knowledge and gain potentially new skills.

## Luhn Algorithm

In this project I implemented the Luhn algorithm to validate the credit card number. That is, the last digit of the card number is called the check digit. It is calculated from the previous digits using this algorithm. The check digit makes sure that the number is entered correctly - and such a card exists.

The formula is:

> - Double the value of every second digit beginning from the right. That is, the last digit is unchanged; the second-to-last digit is doubled; the third-to-last digit is unchanged; and so on. For example, `[1,3,8,6]` becomes `[2,3,16,6]`.
>
> - Add the digits of the doubled values and the undoubled digits from the original number. For example, `[2,3,16,6]` becomes `2+3+1+6+6 = 18`.
>
> - Calculate the remainder when the sum is divided by 10. For the above example, the remainder would be 8.
>
> - If the result equals 0, then the number is valid.

To make the algorithm work more clearly, I split it into four parts instead of writing one big function. The four functions I wrote match the four steps in the instructions above.

### `doubleEverySecondDigitFromRight()`

I am using the `Array.prototype.map()` method to process each element of the array which holds the digits of the credit card number. I chose `map()` instead of `Array.prototype.reduce()` because I know that I do not want to change the data structure. I want to start and finish with an array of the same length.

I am using the modulo operator to check if a number is even or odd. If the number is even, I return it unchanged. If the number is odd, I multiply it by two.

The instructions for implementing the Luhn algorithm say that I must process the digits from right to left, but the `.map()` method processes arrays from left to right. To fix this, I first use the `Array.prototype.reverse()` method to reverse the array before mapping over it. I then use the `.reverse()` method a second time after mapping to put the array back in its original order.

### `sumDigits()`

If for example the last four digits of the credit card number are 6991, applying the first function to that array of numbers produces the following result.

```
doubleEverySecondDigitFromRight([6, 9, 9, 1])
// => [12, 9, 18, 1]
```

Instead of calculating the sum of the numbers in the array, we must instead calculate the sum of each of the digits in the array. In other words:

```
// not like this
12 + 9 + 18 + 1

// but like this
1 + 2 + 9 + 1 + 8 + 1
```

In order to calculate the result I did the following steps:

1. I used the `Array.prototype.join()` method to turn the array of numbers into a string of digits.
2. I used the `String.prototype.split()` method to separate each digit into its own element in an array.
3. I used `.map()` and `parseInt()` to convert each string in the array into a number.
4. Finally a calculated the sum of all the digits with `Array.prototype.reduce()`.

### `mod10()`

This function returns the remainder, after the number is divided by 10. You can find the remainder with the modulo operator.

### `luhn()`

The final step, in order to check if the number was entered correctly. I started by using function composition, by taking the previous three functions and applying them to the `cardNumber` and comparing the result with 0.

## Card size, chip

When I started making the card in HTML and CSS, I tried to stick to the ISO 7810 standard by specifying the dimensions in millimiters instead of regular pixels. In order to draw the chip on the card front, instead of using icons I decided to draw it by myself using CSS, by drawing small boxes inside the main one.

## Dependencies

In this project, I decided to avoid using any package managers or build systems. Instead of writing my React code with JSX syntax, I used plain JavaScript and called the React functions directly.

## Background, design of credit card.

For the page background I used a CSS gradient generator which gave me a harder colour transition than I wanted. In order to fix this and to produce a smoother colour transition for the background, I used a mostly transparent noise image as a repeating background in front of the gradient.

## Credit card background

To make the background of the credit card itself, I used a library called [Trianglify](https://github.com/qrohlf/trianglify). By default Trianglify uses a canvas element, but that caused browser issues.
I managed to fix it by using SVG instead.

## Magnetic strip

On the back side of the credit card I added a magnetic strip. For a more realistic look I added a radial gradient with CSS.

### Metallic color of the text.

To achieve the metallic text on the front of the credit card, I used a combination of CSS properties like a background
with a linear gradient, background-clip, text-shadow, and position.

### Card number entry field

I used a regular expression to prevent the user from entering any non-digit characters. I also used the `maxLength` attribute to stop the user from entering more than sixteen characters.

### Flip animation

I added a 3D flip effect to show the back side of the card. The user can flip the card by clicking on the button.
I decided to add animation effect to make the credit card design more lively and interesting.
One of the main properties used is:  `transform: perspective(600px) rotateY(-180deg)`

### Card provider

I display the card provider on the front of the card when the user enters the first number of their credit card number.
I used a switch statement to decide which card provider image to display. Example:

```
 switch (cardNumber[0]) {
    case '3':
      return e('img', {className: 'americanExpress-logo', src: './img/american-express.png'}, null );
   }
```

In that case, when the user's credit card starts from number 3, while printing the number in the input, he will see the American Express logo in the upper right corner.