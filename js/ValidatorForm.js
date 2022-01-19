const Validator = ({ formSelector, formGroups }) => {
    const form = document.querySelector(formSelector);
    formGroups.map((item) => {
        const inputElement = form.querySelector(item.inputSelector);
        const formGroupElement = inputElement.parentNode.parentNode;
        const groupInputElement =
            formGroupElement.querySelector(".form-group-input");
        const warningElement = formGroupElement.querySelector(".form-warning");
        let nextPassElement,
            nextPassFormGroupElement,
            nextPassGroupInputElement,
            nextPassWarningElement;
        if (item.isConfirmPass) {
            nextPassElement = form.querySelector(item.comparePassSelector);
            nextPassFormGroupElement = nextPassElement.parentNode.parentNode;
            nextPassGroupInputElement =
                nextPassFormGroupElement.querySelector(".form-group-input");
            nextPassWarningElement =
                nextPassFormGroupElement.querySelector(".form-warning");
        }

        let resultCheck;
        inputElement.addEventListener("focus", () => {
            warningElement.textContent = ``;
        });
        inputElement.addEventListener("blur", () => {
            if (item.isEmail) {
                resultCheck = isVaildEmail(inputElement);
                handleVaild(resultCheck);
            } else {
                resultCheck = isVaildLength(
                    inputElement,
                    item.minLength,
                    item.fieldName
                );
                handleVaild(resultCheck);
                if (resultCheck.success && item.isConfirmPass) {
                    resultCheck = isMatchPassword(
                        inputElement,
                        nextPassElement
                    );

                    const isEmptyInput =
                        inputElement.value.length === 0 ||
                        nextPassElement.value.length === 0;
                    resultCheck.elements = [
                        {
                            groupElement: groupInputElement,
                            warnElement: warningElement,
                        },
                        {
                            groupElement: nextPassGroupInputElement,
                            warnElement: nextPassWarningElement,
                        },
                    ];
                    if (!isEmptyInput) handleVaildPassword(resultCheck);
                }
            }
        });

        function handleVaild(outputCheck) {
            if (outputCheck.success) {
                groupInputElement.classList.remove("form-group-invaild");
                groupInputElement.classList.add("form-group-vaild");
            } else {
                groupInputElement.classList.remove("form-group-vaild");
                groupInputElement.classList.add("form-group-invaild");
                warningElement.textContent = outputCheck.message;
            }
        }

        function handleVaildPassword(outputCheck) {
            outputCheck.elements.map((item) => {
                if (inputElement.value.length > 0) {
                    if (outputCheck.success) {
                        item.groupElement.classList.remove(
                            "form-group-invaild"
                        );
                        item.groupElement.classList.add("form-group-vaild");
                        item.warnElement.textContent = "";
                    } else {
                        item.groupElement.classList.remove("form-group-vaild");
                        item.groupElement.classList.add("form-group-invaild");
                        item.warnElement.textContent = outputCheck.message;
                    }
                }
            });
        }
    });

    function isMatchPassword(element, elementCompare) {
        let result = {
            success: true,
        };
        // Hai Element đều có value
        if (element.value !== elementCompare.value) {
            result = {
                success: false,
                message: "Mật khẩu không khớp với nhau",
            };
        }

        return result;
    }
    function isVaildLength(input, minLength, fieldName) {
        let result = {
            success: true,
        };
        if (!input.value.length) {
            result = {
                success: false,
                message: `${fieldName} không được bỏ trống`,
            };
        } else if (input.value.length < minLength) {
            result = {
                success: false,
                message: `${fieldName} phải tối thiểu ${minLength} kí tự`,
            };
        }
        return result;
    }
    function isVaildEmail(input) {
        let result = {};
        if (
            input.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            result = {
                success: true,
            };
        } else {
            result = {
                success: false,
                message: `Trường này phải là Email`,
            };
        }
        return result;
    }
};
