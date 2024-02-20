import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        pwHash: { type: String, required: true },
        pwSalt: { type: String, required: true },
        profilePicUrl: { type: String },
        sixDigitCode: {
            type: String,
            default: () => Math.random().toString().slice(2, 8),
        },
        emailVerified: { type: Boolean, default: false },
    },
    { collection: "users", timestamps: true }
);

// ===== Pre-Save-Hook
// EMAIL toLowerCase bevor sie gespeichter wird
// --> bei registrierung & durch ".isModified()" bei aktualisierung der Email
userSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified("email")) {
        user.email = user.email.toLowerCase();
        next();
    }
});

// ===== Mongoose-Instance-Methods:
// --> ".toProfileInfo()" kann so im Service direkt aufgerufen werden
userSchema.methods.toProfileInfo = function () {
    return {
        userName: this.userName,
        email: this.email,
        profilePicUrl: this.profilePicUrl,
    };
};

userSchema.statics.findByEmail = function (email) {
    if (typeof email !== "string") return null;
    return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model("User", userSchema);

export default User;
