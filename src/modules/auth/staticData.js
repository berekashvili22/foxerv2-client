export const formData = {
    register: [
        {
            title: 'ელ-ფოსტა *',
            placeholder: 'შეიყვანეთ ელ-ფოსტა',
            name: 'email',
            type: 'text',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        },
        {
            title: 'სახელი *',
            placeholder: 'შეიყვანეთ სახელი',
            name: 'firstName',
            type: 'text',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        },
        {
            title: 'გვარი *',
            placeholder: 'შეიყვანეთ გვარი',
            name: 'lastName',
            type: 'text',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        },
        {
            title: 'პაროლი *',
            placeholder: 'შეიყვანეთ პაროლი',
            name: 'password',
            type: 'password',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        },
        {
            title: 'გაიმეორთ პაროლი *',
            placeholder: 'გაიმეორთ პაროლი',
            name: 'password2',
            type: 'password',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        },
        {
            title: 'ვეთანხმები წესებს და პირობებს',
            placeholder: '',
            name: 'agreedOnTerms',
            type: 'checkbox',
            wrapperClass: 'auth-checkbox-form-wrapper',
            inputClass: 'auth-checkbox-form-input',
            errorClass: 'checkbox-error'
        }
    ],
    login: [
        {
            title: 'ელ-ფოსტა',
            placeholder: 'შეიყვანეთ ელ-ფოსტა',
            name: 'email',
            type: 'text',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        },
        {
            title: 'პაროლი',
            placeholder: 'შეიყვანეთ პაროლი',
            name: 'password',
            type: 'password',
            wrapperClass: '',
            inputClass: '',
            errorClass: ''
        }
    ]
};

export const strings = {
    login: {
        mainTitle: 'ავტორიზაცია',
        questionText: 'ახალი ხარ?',
        solutionText: 'დარეგისტრირდი'
    },
    register: {
        mainTitle: 'რეგისტრაცია',
        questionText: 'უკვე დარეგისტრირდი?',
        solutionText: 'შესვლა'
    },
    forgotPassword: 'დაგავიწყდა პაროლი?',
    or: 'ან',
    registerButtonText: 'რეგისტრაცია',
    loginButtonText: 'შესვლა',
    promotionText: 'მოიწვიე მეგობრები და მიიღეთ დაამატებითი ქულები და ფასდაკლებები ანგარიშზე'
};
