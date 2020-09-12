export class CircularDetails {
    public circularDetail: string;
    public circularNumber: string;
    public clientNumber: string;
    public date: string;
    public departmant: string;
    public fileName: string;
    public id: number;

}

export class FileUpload {
    public clientName: string;
    public file: File;
}

export class User {
    public username: string;
    public password: string;
}

export class UserDetails {
    public clientNumber: string;
    public firstName: string;
    public isAdmin: boolean;
    public lastName: string;
    public password: string;
    public userName: string;
}


export class PODetail {
    public orderNo:string;
    public item:string;
    public make:string;
    public modelNo:string;
    public quantity:string;
    public rate:string;
    public remark:string;
    public date:string;
    public itemCode:string
    public customer:string
    public fileName:string
}

export class EnquiryDetail {
    public companyName:string;
    public personName:string;
    public mobile:string;
    public place:string;
    public enquiryNumber:string;
    public date:string;
    public itemDescription:string;
    public make:string;
    public status:string
    public remark:string
    public fileName:string
}

export class CatalogDetail{
    public productName:string;
    public modelNo:string;
    public oldModelNo:string;
    public voltage:string;
    public range:number;
    public colour:string;
    public fileName:string
}