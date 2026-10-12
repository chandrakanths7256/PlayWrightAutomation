Feature: cartApplication

  Scenario: User will test the cart application from end to end
    Given user login to the cart application
    And User selects the cart item dynamically <ExpectedItem>:<SuccessCartMessage>
    And User verifies the items are added to the cart

    Examples:
      | ExpectedItem | SuccessCartMessage    |
      | ZARA COAT 3  | Product Added To Cart |
