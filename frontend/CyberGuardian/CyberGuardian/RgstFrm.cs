using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CyberGuardian
{
    public partial class RgstFrm : Form

    {
        private readonly HttpClient _httpClient = new HttpClient();
        public RgstFrm()
        {
            InitializeComponent();
        }

        private void RgstFrm_Load(object sender, EventArgs e)
        {

        }

        private async Task textBox1_TextChangedAsync(object sender, EventArgs e)
        {
            await RegisterUser(textBox2.Text, textBox3.Text);
        }

        private void buttonGetCode_Click(object sender, EventArgs e)
        {

        }
        private async Task RegisterUser(string email, string password)
        {
            var postData = new Dictionary<string, string>
        {
            { "email", email },
            { "password", password }
        };

            var content = new FormUrlEncodedContent(postData);
            var response = await _httpClient.PostAsync("http://localhost:3000/api/register", content);
            if (response.IsSuccessStatusCode)
            {
                MessageBox.Show("User registered successfully");
            }
            else
            {
                MessageBox.Show("Failed to register user");
            }
        }
    }
}
