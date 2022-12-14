import type { Database } from "./database";
import type { UserProcedure } from "./util/userProdecure";

type Dependencies = {
    database: Database;
    userProcedure: UserProcedure;
};

export default Dependencies;
