import { SpeedDial } from "@rneui/base";
import { useState } from "react";

export default function FabButton() {
    const [open, setOpen] = useState(false);

    return (
        <SpeedDial
            color="#181515"
            isOpen={open}
            icon={{
                name: "edit",
                color: "#fff",
            }}
            openIcon={{
                name: "close",
                color: "#fff",
            }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
        >
            <SpeedDial.Action
                color="#65D45D"
                icon={{
                    name: "add",
                    color: "#fff",
                }}
                title="Novo"
                onPress={() => console.log("criar formulario")}
            />
            <SpeedDial.Action
                color="#EB4B46"
                icon={{
                    name: "delete",
                    color: "#fff",
                }}
                title="Excluir"
                onPress={() => console.log("deletar formulário")}
            />
        </SpeedDial>
    );
}
