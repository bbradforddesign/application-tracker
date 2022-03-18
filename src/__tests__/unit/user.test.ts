import { registerUser } from "../../controllers/user";
import { UserFields } from "../../models/user";
import { getUser, createUser } from "../../services/user";

test("retrieves user data by ID", async () => {
    try {
        const user = await getUser(1);
        expect(user).toEqual({
            id: 1,
            first_name: "John",
            last_name: "Doe",
        });
    } catch (err) {
        console.log(err);
    }
});

test("creates a new user within the users table", async () => {
    const userFields: UserFields = {
        first_name: "John",
        last_name: "Doe",
    };

    try {
        const newUser = await registerUser(userFields);
        expect(newUser.first_name).toEqual(userFields.first_name);
        expect(newUser.last_name).toEqual(userFields.last_name);
        expect(newUser.id).not.toBeNull();
    } catch (err) {
        console.log(err);
    }
});
