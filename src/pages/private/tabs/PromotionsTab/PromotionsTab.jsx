// tabs/PromotionsTab.jsx
import React, { useState } from "react";
import PromoSearchBar from "../../../../components/private/PromoSearchBar/PromoSearchBar.jsx";
import PromoTable from "../../../../components/private/PromoTable/PromoTable.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./PromotionsTab.css";

const PromotionsTab = ({ promos, onInsert, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [active, setActive] = useState(false);

    const filteredPromos = promos.filter((promo) => {
        const matchesName = promo.nombre.toLowerCase().includes(search.toLowerCase());
        const matchesYear = year === "" || promo.fechaInicio.startsWith(year);
        const matchesMonth = month === "" || new Date(promo.fechaInicio).getMonth() + 1 === Number(month);
        const matchesActive = !active || promo.activo === true;
        return matchesName && matchesYear && matchesMonth && matchesActive;
    });

    return (
        <div className="promotions-tab">
            <PromoSearchBar
                search={search}
                onSearchChange={setSearch}
                year={year}
                onYearChange={setYear}
                month={month}
                onMonthChange={setMonth}
                active={active}
                onActiveChange={setActive}
                onSubmit={() => { }}
            />

            <PromoTable
                promos={filteredPromos}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <div className="promotions-tab__footer">
                <BotonPrimario onClick={onInsert}>Insertar Promoción</BotonPrimario>
            </div>
        </div>
    );
};

export default PromotionsTab;