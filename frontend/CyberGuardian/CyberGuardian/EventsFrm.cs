using System;
using System.Windows.Forms;

using System.Data;
using System.IO;
using Newtonsoft.Json;

namespace CyberGuardian
{
    public partial class EventsFrm : Form
    {
        public EventsFrm()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            string json = File.ReadAllText(@"E:\Customers.json");
            dataGridView1.DataSource = JsonConvert.DeserializeObject<DataTable>(json);
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void label6_Click(object sender, EventArgs e)
        {

        }
    }
}
