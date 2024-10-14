import { AfterContentInit, Component } from "@angular/core";
import { createMarvinPro } from "marvinpro";

@Component({
    selector: "app-marvinpro",
    standalone: true,
    imports: [],
    templateUrl: "./marvinpro.component.html",
    styleUrl: "./marvinpro.component.scss",
})
export class MarvinproComponent implements AfterContentInit {
    ngAfterContentInit() {
        const marvinproContainer = document.getElementById("marvin-app");

        if (marvinproContainer) {
            createMarvinPro(marvinproContainer, {}).then((mPro) => {});
        }
    }
}
