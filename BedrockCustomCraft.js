(function AddBedrockRecipe() {
    ModAPI.meta.title("BedrockCraftingRecipeMod");
    ModAPI.meta.description("Adds a crafting recipe to create Bedrock blocks from dirt.");

    async function addBedrockRecipe() {
        await new Promise((res, rej) => {
            if (ModAPI.blocks) {
                res()
            } else {
                ModAPI.addEventListener("bootstrap", res);
            }
        });
        var ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
        function ToChar(char) {
            return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
        }

        // Define the recipe legend to map characters to items
        var recipeLegend = {
            "C": {
                type: "item",
                id: "custom_item" // Using dirt blocks
            }
        };

        // Define the crafting grid pattern for the recipe
        var recipePattern = [
            "CCC",
            "CCC",
            "CCC"
        ];

        // Convert the recipe pattern and legend into the required format
        var recipeInternal = [];
        Object.keys(recipeLegend).forEach((key) => {
            recipeInternal.push(ToChar(key));
            var ingredient = (recipeLegend[key].type === "block" ? ModAPI.blocks : ModAPI.items)[recipeLegend[key].id].getRef();
            recipeInternal.push(ingredient);
        });

        var recipeContents = recipePattern.map(row => ModAPI.util.str(row));
        var recipe = ModAPI.util.makeArray(ObjectClass, recipeContents.concat(recipeInternal));

        // Define the output item as Bedrock
        var resultItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1](ModAPI.blocks["Bedrock"].getRef(), 1);



        // Register the recipe with CraftingManager
        var craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
        ModAPI.hooks.methods.nmic_CraftingManager_addRecipe(craftingManager, resultItem, recipe);
    }

    ModAPI.dedicatedServer.appendCode(addBedrockRecipe);

    addBedrockRecipe();
})();
