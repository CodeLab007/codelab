import { Auth } from "../../models/Auth";
import { User } from "../../models/User";
import { Company } from "../../models/Company";
import { Token } from "../../models/Token";
import { Job } from "../../models/Job";

Company.hasMany(Auth);
Auth.belongsTo(Company);


Company.hasMany(Job);
Job.belongsTo(Company);

Auth.hasMany(Token);
Token.belongsTo(Auth);

User.hasMany(Auth);
Auth.belongsTo(User);







