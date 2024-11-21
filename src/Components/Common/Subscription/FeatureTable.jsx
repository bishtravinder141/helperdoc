import React from "react";
import GreenTick from "../../../Assets/SVGIcons/GreenTick";
import NoDataFound from "../NoDataFound";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { USER_ROLE } from "../../../Constant/Constant";

export default function FeatureTable({ userType }) {
  const { employerSubscriptionPlanFeatures, agencySubscriptionPlanFeatures } =
    useSelector((state) => state.common);
  const selectedUserPlans =
    userType === USER_ROLE.employer
      ? employerSubscriptionPlanFeatures
      : agencySubscriptionPlanFeatures;

  const { t } = useTranslation();

  return (
    <table className="table align-middle table-layout-fixed">
      <tbody>
        <>
          {selectedUserPlans.length > 0 ? (
            <>
              <tr>
                <th>{t("features")}</th>
                {selectedUserPlans[0].duration.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
              {selectedUserPlans[0]?.items?.map((feat) => (
                <tr>
                  <td>
                    <b>{feat}</b>
                  </td>
                  <td>
                    <GreenTick />
                  </td>
                  {userType === USER_ROLE.employer && (
                    <>
                      <td>
                        <GreenTick />
                      </td>
                      <td>
                        <GreenTick />
                      </td>{" "}
                    </>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <NoDataFound title={t("no_data_found")} />
            </tr>
          )}
        </>
      </tbody>
    </table>
  );
}
