
// Transaction Type
export const TRANSACTION_TYPE_PLN_TOKEN = 'PLN_TOKEN';
export const TRANSACTION_TYPE_PULSA = 'PULSA';
export const TRANSACTION_TYPE_BPJS = 'BPJS';

// PIN
export const BIRTH_DATE_PIN: string = "120300"


// Phone Operator
interface IPhoneOperator {
    name: string;
    imgURL?: string
}

const OPERATOR_TELKOMSEL: IPhoneOperator = {
    name: "Telkomsel",
    imgURL: "https://seeklogo.com/images/T/telkomsel-logo-4EC1FC20C9-seeklogo.com.png"
}

const OPERATOR_INDOSAT_OOREDEOO: IPhoneOperator = {
    name: "Indosat Ooredeoo",
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWzyumm3LMVK9q6qDglsI-Ahm0WmqJzFYLA&s"
}

const OPERATOR_XL_AXIATA: IPhoneOperator = {
    name: "XL Axiata",
    imgURL: "https://w7.pngwing.com/pngs/43/821/png-transparent-xl-axiata-telecommunication-logo-axiata-group-xl-xplor-id-angle-text-people.png"
}

const OPERATOR_AXIS: IPhoneOperator = {
    name: "Axis",
    imgURL: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01g9bypc7n8rzvfvea02wxxvmf.jpg"
}

const OPERATOR_THREE: IPhoneOperator = {
    name: "Three",
    imgURL: "https://w7.pngwing.com/pngs/354/974/png-transparent-three-uk-mobile-service-provider-company-three-ireland-mobile-broadband-outbound-thumbnail.png"
}

const OPERATOR_SMARTFREN: IPhoneOperator = {
    name: "Smartfren",
    imgURL: "https://seeklogo.com/images/S/smartfren-logo-A978AD9193-seeklogo.com.png"
}

const OPERATOR_SAMPOERNA_TELKOM: IPhoneOperator = {
    name: "Sampoerna Telkom",
    imgURL: "https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/99834399742038000ec4f8108b55a794.jpg"
}

const OPERATOR_BYRU_PASTI_SATELIT: IPhoneOperator = {
    name: "BYRU / PASTI Satelit",
    imgURL: "https://media.licdn.com/dms/image/v2/D4E0BAQGOujsy-EkBXg/company-logo_200_200/company-logo_200_200/0/1680253317893/pasifik_satelit_nusantara_logo?e=1737590400&v=beta&t=VVSBhvTJQd1xE9CS-dJkRdDw4oci8ef04W6O3VSiSrM"
}

export const isValidINDPhoneOperatorPrefix: string[] = [
    "0852", "0853", "0811", "0812", "0813", "0821", "0822", "0823", "0851",
    "0855", "0856", "0857", "0858", "0814", "0815", "0816", "0817", "0818",
    "0819", "0859", "0877", "0878", "0831", "0832", "0833", "0838", "08315", "0895", "0896",
    "0897", "0898", "0899", "0881", "0882", "0883", "0884", "0885", "0886",
    "0887", "0888", "0889", "0828", "0868"
]

export const phonePrefixToINDOperatorMap = {
    "0852": OPERATOR_TELKOMSEL,
    "0853": OPERATOR_TELKOMSEL,
    "0811": OPERATOR_TELKOMSEL,
    "0812": OPERATOR_TELKOMSEL,
    "0813": OPERATOR_TELKOMSEL,
    "0821": OPERATOR_TELKOMSEL,
    "0822": OPERATOR_TELKOMSEL,
    "0823": OPERATOR_TELKOMSEL,
    "0851": OPERATOR_TELKOMSEL,
    "0855": OPERATOR_INDOSAT_OOREDEOO,
    "0856": OPERATOR_INDOSAT_OOREDEOO,
    "0857": OPERATOR_INDOSAT_OOREDEOO,
    "0858": OPERATOR_INDOSAT_OOREDEOO,
    "0814": OPERATOR_INDOSAT_OOREDEOO,
    "0815": OPERATOR_INDOSAT_OOREDEOO,
    "0816": OPERATOR_INDOSAT_OOREDEOO,
    "0817": OPERATOR_XL_AXIATA,
    "0818": OPERATOR_XL_AXIATA,
    "0819": OPERATOR_XL_AXIATA,
    "0859": OPERATOR_XL_AXIATA,
    "0877": OPERATOR_XL_AXIATA,
    "0878": OPERATOR_XL_AXIATA,
    "0831": OPERATOR_AXIS,
    "0832": OPERATOR_AXIS,
    "0833": OPERATOR_AXIS,
    "0838": OPERATOR_AXIS,
    "08315": OPERATOR_AXIS,
    "0895": OPERATOR_THREE,
    "0896": OPERATOR_THREE,
    "0897": OPERATOR_THREE,
    "0898": OPERATOR_THREE,
    "0899": OPERATOR_THREE,
    "0881": OPERATOR_SMARTFREN,
    "0882": OPERATOR_SMARTFREN,
    "0883": OPERATOR_SMARTFREN,
    "0884": OPERATOR_SMARTFREN,
    "0885": OPERATOR_SMARTFREN,
    "0886": OPERATOR_SMARTFREN,
    "0887": OPERATOR_SMARTFREN,
    "0888": OPERATOR_SMARTFREN,
    "0889": OPERATOR_SMARTFREN,
    "0828": OPERATOR_SAMPOERNA_TELKOM,
    "0868": OPERATOR_BYRU_PASTI_SATELIT,
};