import BaseComponent from "../../../components/BaseComponent";

export default class AddCarPopup extends BaseComponent {
    constructor(page) {
        super(page, page.locator('div.modal-content'))
        this.brandInput = this.container.locator('#addCarBrand')
        this.modelInput = this.container.locator('#addCarModel')
        this.mileageInput = this.container.locator('#addCarMileage')
        this.addCarBtn = this.container.locator('.btn-primary')
    }

    async selectCar({ brand, model, mileage }) {
        await this.brandInput.selectOption({ label: brand })
        await this.modelInput.selectOption({ label: model })
        await this.mileageInput.fill(mileage)
    }

    async addCar(car) {
        await this.selectCar(car)
        await this.addCarBtn.click()
    }
}
