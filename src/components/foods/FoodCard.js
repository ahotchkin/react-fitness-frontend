import React from 'react';

const FoodCard = props => {

  // Is there a way to use iteration to create each table row?
  return (
    <div>
      { !props.mealCheck ?
        <div>
          <h5>{props.food.brand_name} {props.food.description} Nutrition</h5>
          <table className="bottom-margin">
            <tbody>
              <tr>
                { props.food.servings_per_container === 1 ?
                  <td>Serving size: {props.food.serving_size} <span>&#183;</span>  {props.food.servings_per_container} serving per container</td>
                :
                  <td>Serving size: {props.food.serving_size} <span>&#183;</span>  {props.food.servings_per_container} servings per container</td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      :
        null
      }

      <div className="nutrition-card">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Calories</th>
              <th className="right-align">{Math.round(props.food.calories * props.number_of_servings)}</th>
            </tr>
          </thead>
          <tbody className="table-font-small">
            <tr className="table-font-extra-small">
              <td></td>
              <td className="right-align"><b>% Daily Value</b></td>
            </tr>
            <tr>
              <td><b>Total Fat</b> {Math.round(props.food.total_fat * props.number_of_servings)}g</td>
              { Math.round(((props.food.total_fat * props.number_of_servings) / props.currentUser.attributes.daily_fat_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.total_fat * props.number_of_servings) / props.currentUser.attributes.daily_fat_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.total_fat * props.number_of_servings) / props.currentUser.attributes.daily_fat_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent">Saturated Fat {Math.round(props.food.saturated_fat * props.number_of_servings)}g</td>
              { Math.round(((props.food.saturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_saturated_fat_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.saturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_saturated_fat_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.saturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_saturated_fat_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent">Polyunsaturated Fat {Math.round(props.food.polyunsaturated_fat * props.number_of_servings)}g</td>
              { Math.round(((props.food.polyunsaturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_polyunsaturated_fat_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.polyunsaturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_polyunsaturated_fat_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.polyunsaturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_polyunsaturated_fat_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent">Monounsaturated Fat {Math.round(props.food.monounsaturated_fat * props.number_of_servings)}g</td>
              { Math.round(((props.food.monounsaturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_monounsaturated_fat_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.monounsaturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_monounsaturated_fat_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.monounsaturated_fat * props.number_of_servings) / props.currentUser.attributes.daily_monounsaturated_fat_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent"><em>Trans</em> Fat {Math.round(props.food.trans_fat * props.number_of_servings)}g</td>
              <td></td>
            </tr>
            <tr>
              <td><b>Cholesterol</b> {Math.round(props.food.cholesterol * props.number_of_servings)}mg</td>
              { Math.round(((props.food.cholesterol * props.number_of_servings) / props.currentUser.attributes.daily_cholesterol_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.cholesterol * props.number_of_servings) / props.currentUser.attributes.daily_cholesterol_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.cholesterol * props.number_of_servings) / props.currentUser.attributes.daily_cholesterol_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td><b>Sodium</b> {Math.round(props.food.sodium * props.number_of_servings)}mg</td>
              { Math.round(((props.food.sodium * props.number_of_servings) / props.currentUser.attributes.daily_sodium_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.sodium * props.number_of_servings) / props.currentUser.attributes.daily_sodium_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.sodium * props.number_of_servings) / props.currentUser.attributes.daily_sodium_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td><b>Total Carbohydrate</b> {Math.round(props.food.total_carbohydrate * props.number_of_servings)}g</td>
              { Math.round(((props.food.total_carbohydrate * props.number_of_servings) / props.currentUser.attributes.daily_carbohydrate_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.total_carbohydrate * props.number_of_servings) / props.currentUser.attributes.daily_carbohydrate_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.total_carbohydrate * props.number_of_servings) / props.currentUser.attributes.daily_carbohydrate_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent">Dietary Fiber {Math.round(props.food.dietary_fiber * props.number_of_servings)}g</td>
              { Math.round(((props.food.dietary_fiber * props.number_of_servings) / props.currentUser.attributes.daily_fiber_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.dietary_fiber * props.number_of_servings) / props.currentUser.attributes.daily_fiber_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.dietary_fiber * props.number_of_servings) / props.currentUser.attributes.daily_fiber_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent">Total Sugars {Math.round(props.food.total_sugars * props.number_of_servings)}g</td>
              <td></td>
            </tr>
            <tr>
              <td className="indent-double">Added Sugars {Math.round(props.food.added_sugars * props.number_of_servings)}g</td>
              { Math.round(((props.food.added_sugars * props.number_of_servings) / props.currentUser.attributes.daily_sugar_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.added_sugars * props.number_of_servings) / props.currentUser.attributes.daily_sugar_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.added_sugars * props.number_of_servings) / props.currentUser.attributes.daily_sugar_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td className="indent-double">Sugar Alcohols {Math.round(props.food.sugar_alcohols * props.number_of_servings)}g</td>
              <td></td>
            </tr>
            <tr>
              <td><b>Protein</b> {Math.round(props.food.protein * props.number_of_servings)}g</td>
              { Math.round(((props.food.protein * props.number_of_servings) / props.currentUser.attributes.daily_protein_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.protein * props.number_of_servings) / props.currentUser.attributes.daily_protein_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.protein * props.number_of_servings) / props.currentUser.attributes.daily_protein_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td>Vitamin A {Math.round(props.food.vitamin_a * props.number_of_servings)}mcg</td>
              { Math.round(((props.food.vitamin_a * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_a_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.vitamin_a * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_a_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.vitamin_a * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_a_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td>Vitamin C {Math.round(props.food.vitamin_c * props.number_of_servings)}mg</td>
              { Math.round(((props.food.vitamin_c * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_c_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.vitamin_c * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_c_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.vitamin_c *   props.number_of_servings) / props.currentUser.attributes.daily_vitamin_c_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td>Vitamin D {Math.round(props.food.vitamin_d * props.number_of_servings)}mcg</td>
              { Math.round(((props.food.vitamin_d * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_d_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.vitamin_d * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_d_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.vitamin_d * props.number_of_servings) / props.currentUser.attributes.daily_vitamin_d_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td>Calcium {Math.round(props.food.calcium * props.number_of_servings)}mg</td>
              { Math.round(((props.food.calcium * props.number_of_servings) / props.currentUser.attributes.daily_calcium_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.calcium * props.number_of_servings) / props.currentUser.attributes.daily_calcium_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.calcium * props.number_of_servings) / props.currentUser.attributes.daily_calcium_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td>Iron {Math.round(props.food.iron * props.number_of_servings)}mg</td>
              { Math.round(((props.food.iron * props.number_of_servings) / props.currentUser.attributes.daily_iron_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.iron * props.number_of_servings) / props.currentUser.attributes.daily_iron_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.iron * props.number_of_servings) / props.currentUser.attributes.daily_iron_goal) * 100)}%</b></td>
              }
            </tr>
            <tr>
              <td>Potassium {Math.round(props.food.potassium * props.number_of_servings)}mg</td>
              { Math.round(((props.food.potassium * props.number_of_servings) / props.currentUser.attributes.daily_potassium_goal) * 100) > 100 ?
                <td className="right-align negative"><b>{Math.round(((props.food.potassium * props.number_of_servings) / props.currentUser.attributes.daily_potassium_goal) * 100)}%</b></td>
              :
                <td className="right-align"><b>{Math.round(((props.food.potassium * props.number_of_servings) / props.currentUser.attributes.daily_potassium_goal) * 100)}%</b></td>
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

};



export default FoodCard;
