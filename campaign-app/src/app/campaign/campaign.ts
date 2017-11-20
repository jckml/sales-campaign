export class Campaign {

  id: number;
  name: string;
  keyword: string;
  bidAmount: number;
  campaignFunds: number;
  status: boolean;
  town: string;
  radius: number;

  constructor(id: number, name: string, keyword: string, bidAmount: number, campaignFunds: number,
    status: boolean, town: string, radius: number) {
    this.id = id;
    this.name = name;
    this.keyword = keyword;
    this.bidAmount = bidAmount;
    this.campaignFunds = campaignFunds;
    this.status = status;
    this.radius = radius;
  }
}
