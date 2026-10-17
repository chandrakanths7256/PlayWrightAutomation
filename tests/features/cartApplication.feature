Feature: cartApplication

  Scenario: User will test the cart application from end to end
    Given user login to the cart application <Email>:<Password>
    And User selects the cart item dynamically <ExpectedItem>:<SuccessCartMessage>
    And User verifies the items are added to the cart <ExpectedItem>
    And User checkout the items from the cart and place the order <Email>
    And User verfies the order is placed successfully
    And User verifies the order is stored in the orders history <Email>:<ExpectedItem>
    Examples:
      | ExpectedItem | SuccessCartMessage    | Email                     | Password |
      | ZARA COAT 3  | Product Added To Cart | chandrakanth007@gmail.com | Chan@123 |
