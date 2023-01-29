import { Auth } from "../../models/Auth";
import { User } from "../../models/User";
import { Company } from "../../models/Company";
import { Token } from "../../models/Token";

Company.hasMany(Auth);
Auth.belongsTo(Company);

Auth.hasMany(Token);
Token.belongsTo(Auth);

User.hasMany(Auth);
Auth.belongsTo(User);





