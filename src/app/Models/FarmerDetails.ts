import {User} from './User'
import {CommunityDetails} from './CommunityDetails'
export class FarmerDetails{
    farmerId:number;
    userId:number;
    communityId:number;
    user:User;
    isApproved:boolean;
    isAccountDisabled:boolean;
    community:CommunityDetails;
}