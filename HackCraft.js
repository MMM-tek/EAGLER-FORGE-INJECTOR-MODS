(function AddHackItemRecipe() {
    ModAPI.meta.title("HackRecipeMod");
    
    async function addHackItemRecipe() {
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
            "D": {
                type: "block",
                id: "dirt" // Using dirt blocks
            }
        };

        // Define the crafting grid pattern for the recipe
        var recipePattern = [
            "DDD",
            "DDD",
            "DDD"
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

        // Define the output item as custom_item
        var resultItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1](ModAPI.items["hack"].getRef(), 1);



        // Register the recipe with CraftingManager
        var craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
        ModAPI.hooks.methods.nmic_CraftingManager_addRecipe(craftingManager, resultItem, recipe);
    }

    ModAPI.dedicatedServer.appendCode(addHackItemRecipe);

    addHackItemRecipe();
})();
